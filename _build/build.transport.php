<?php
function getSnippetContent($filename) {
    $o = file_get_contents($filename);
    $o = str_replace('<?php','',$o);
    $o = str_replace('?>','',$o);
    $o = trim($o);
    return $o;
}

$tstart = explode(' ', microtime());
$tstart = $tstart[1] + $tstart[0];
set_time_limit(0);
 
/* define package names */
define('PKG_NAME','MapsTv');
define('PKG_NAME_LOWER','mapstv');
define('PKG_VERSION','1.0.0');
define('PKG_RELEASE','pl');
 
/* define build paths */
$root = dirname(dirname(__FILE__)).'/';
$sources = array(
    'root' => $root,
    'build' => $root . '_build/',
    'data' => $root . '_build/data/',
    'lexicon' => $root . 'core/components/'.PKG_NAME_LOWER.'/lexicon/',
    'docs' => $root.'core/components/'.PKG_NAME_LOWER.'/docs/',
    'elements' => $root.'core/components/'.PKG_NAME_LOWER.'/elements/',
    'source_assets' => $root.'assets/components/'.PKG_NAME_LOWER,
    'source_core' => $root.'core/components/'.PKG_NAME_LOWER,
);
unset($root);
 
/* override with your own defines here (see build.config.sample.php) */
require_once $sources['build'] . 'build.config.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';
 
$modx= new modX();
$modx->initialize('mgr');
echo XPDO_CLI_MODE ? '' : '<pre>';
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget('ECHO');
 
$modx->loadClass('transport.modPackageBuilder','',false, true);
$builder = new modPackageBuilder($modx);
$builder->createPackage(PKG_NAME_LOWER,PKG_VERSION,PKG_RELEASE);


// Register namespace for this extra -------------------------------------------------
$builder->registerNamespace(PKG_NAME_LOWER,false,true,'{core_path}components/'.PKG_NAME_LOWER.'/');
/* create category */
$category= $modx->newObject('modCategory');
$category->set('id',1);
$category->set('category','MapsTv');

/* add snippets */
$modx->log(modX::LOG_LEVEL_INFO,'Adding in snippets.');
$snippets = array();
$snippets[0] = $modx->newObject('modSnippet');
$snippets[0]->fromArray(array(
    'id' => 1,
    'name' => 'JSONtoChunk',
    'description' => 'Custom output filter. If the input is an JSON array it will output the chunk you specified with placeholders for all the values.',
    'snippet' => getSnippetContent($sources['source_core'].'/elements/snippets/JSONtoChunk.snippet.php'),
));
if (is_array($snippets)) {
    $category->addMany($snippets);
} else { $modx->log(modX::LOG_LEVEL_FATAL,'Adding snippets failed.'); }
/* create category vehicle */
$attr = array(
    xPDOTransport::UNIQUE_KEY => 'category',
    xPDOTransport::PRESERVE_KEYS => false,
    xPDOTransport::UPDATE_OBJECT => true,
    xPDOTransport::RELATED_OBJECTS => true,
    xPDOTransport::RELATED_OBJECT_ATTRIBUTES => array (
        'Snippets' => array(
            xPDOTransport::PRESERVE_KEYS => false,
            xPDOTransport::UPDATE_OBJECT => true,
            xPDOTransport::UNIQUE_KEY => 'name',
        ),
    )
);
$vehicle = $builder->createVehicle($category,$attr);

$builder->putVehicle($vehicle);



// /* create category */
// $category= $modx->newObject('modCategory');
// $category->set('id',1);
// $category->set('category',PKG_NAME);

// $vehicle = $builder->createVehicle($category);



// $category->addMany($plugin);
// $snippet = $modx->newObject('modSnippet');
// $snippet->fromArray(array(
//     'id' => 1,
//     'name' => 'JSONtoChunk',
//     'description' => 'Custom output filter. If the input is an JSON array it will output the chunk you specified with placeholders for all the values.',
//     'snippet' => getSnippetContent($sources['source_core'].'/elements/snippets/JSONtoChunk.snippet.php'),
// ));
// $attr = array(
//     xPDOTransport::PRESERVE_KEYS => false,
//     xPDOTransport::UPDATE_OBJECT => true,
//     xPDOTransport::UNIQUE_KEY => 'name',
// );
// $vehicle = $builder->createVehicle($snippet,$attr);
// $category->addMany($snippet);

// $builder->putVehicle($vehicle);
// $modx->log(modX::LOG_LEVEL_INFO,'Packaged in 1 Snippet.'); flush();

// Create the plugin object ----------------------------------------------------------
$plugin= $modx->newObject('modPlugin');
$plugin->set('id',1);
$plugin->set('name', PKG_NAME);
$plugin->set('description', PKG_NAME.' '.PKG_VERSION.'-'.PKG_RELEASE.' plugin for MODx Revolution');
$plugin->set('plugincode', file_get_contents($sources['source_core'] . '/elements/plugins/'.PKG_NAME_LOWER.'.plugin.php'));
$plugin->set('category', 0);

// Add plugin events -----------------------------------------------------------------
$events = include $sources['data'].'transport.plugin.events.php';
if (is_array($events) && !empty($events)) {
    $plugin->addMany($events);
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not find plugin events!');
}
$modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($events).' Plugin Events.'); flush();
unset($events);


// Define vehicle attributes ----------------------------------------------------------
$attributes= array(
    xPDOTransport::UNIQUE_KEY => 'name',
    xPDOTransport::PRESERVE_KEYS => false,
    xPDOTransport::UPDATE_OBJECT => true,
    xPDOTransport::RELATED_OBJECTS => true,
    xPDOTransport::RELATED_OBJECT_ATTRIBUTES => array (
        'PluginEvents' => array(
            xPDOTransport::PRESERVE_KEYS => true,
            xPDOTransport::UPDATE_OBJECT => false,
            xPDOTransport::UNIQUE_KEY => array('pluginid','event'),
        ),
    ),
);

// Create transport vehicle ------------------------------------------------------------
$vehicle = $builder->createVehicle($plugin, $attributes);


// Add File resolvers ------------------------------------------------------------------
$vehicle->resolve('file',array(
    'source' => $sources['source_assets'],
    'target' => "return MODX_ASSETS_PATH . 'components/';",
));
$vehicle->resolve('file',array(
    'source' => $sources['source_core'],
    'target' => "return MODX_CORE_PATH . 'components/';",
));


// Build transport vehicle -------------------------------------------------------------
$builder->putVehicle($vehicle);


// Adding in docs ----------------------------------------------------------------------
/* now pack in the license file, readme and setup options */
$builder->setPackageAttributes(array(
    'license' => file_get_contents($sources['docs'] . 'license.txt'),
    'readme' => file_get_contents($sources['docs'] . 'readme.txt'),
    'changelog' => file_get_contents($sources['docs'] . 'changelog.txt'),
));
$modx->log(xPDO::LOG_LEVEL_INFO,'Set Package Attributes.'); flush();


// Create transport package ------------------------------------------------------------
$modx->log(xPDO::LOG_LEVEL_INFO,'Zipping up package...'); flush();
$builder->pack();

$mtime= microtime();
$mtime= explode(" ", $mtime);
$mtime= $mtime[1] + $mtime[0];
$tend= $mtime;
$totalTime= ($tend - $tstart);
$totalTime= sprintf("%2.4f s", $totalTime);

$modx->log(modX::LOG_LEVEL_INFO,"\n<br />Package Built.<br />\nExecution time: {$totalTime}\n");

exit ();
















