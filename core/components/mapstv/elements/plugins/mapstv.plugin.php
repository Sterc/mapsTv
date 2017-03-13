<?php
/**
 * MapsTv
 *
 * Copyright 2016 by Sterc <modx+mapstv@sterc.nl>
 *
 * MapsTv is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * MapsTv is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * MapsTv; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package MapsTv
 */
/**
 * Input TV render for MapsTv's MapsTvItem TV
 *
 * @package MapsTv
 * @subpackage tv
 */
$corePath = $modx->getOption('mapstv.core_path', null, $modx->getOption('core_path').'components/mapstv/');
$assetsUrl = $modx->getOption('mapstv.assets_url', null, $modx->getOption('assets_url').'components/mapstv/');

$modx->lexicon->load('mapstv:default');

switch ($modx->event->name) {
    
    case 'OnTVInputRenderList':
    	// Add lexicon
    	$modx->controller->addLexiconTopic('mapstv:default');
        $modx->event->output($corePath.'elements/tv/input/');
        break;
    
    case 'OnDocFormRender':
        // Add the Google Maps api to the resource form
        $source = '//maps.google.com/maps/api/js';
        if ($modx->getOption('mapstv.api_key', null, null, true)) {
            $source .= '?key='.$modx->getOption('mapstv.api_key', null, null, true);
        }
        $modx->regClientStartupScript($source);
        $modx->regClientStartupScript($assetsUrl . 'js/mgr/mapstv.js');
        $modx->regClientStartupScript($assetsUrl . 'js/lib/Ext.ux.GMapPanel3.js');
        break;
        
}