<?php
/**
 * JSONtoChunk
 * Custom output filter. If the input is an JSON array it will output the chunk you specified with placeholders for all the values
 *
 * Usage: [[*tvValue:JSONtoChunk=`ChunkName`]]
 * Usage inside chunk: [[+key]]
 *
 * @author Sterc <modx+mapstv@sterc.nl>
 */
$output = $input;
$array = $modx->fromJSON($input);
if (count($array) > 0) {
    $chunk = $modx->getObject('modChunk', array('name' => $options));
    if ($chunk) {
        $output = $chunk->process($array);
    }
}
return $output;