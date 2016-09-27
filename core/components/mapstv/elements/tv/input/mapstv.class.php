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
class MapsTvInputRender extends modTemplateVarInputRender {

    public function getTemplate() {
    	$corePath = $this->modx->getOption('mapstv.core_path', null, $this->modx->getOption('core_path').'components/mapstv/');
        return $corePath.'elements/tv/tpl/mapstv.input.tpl';
    }

    public function process($value,array $params = array()) {
        $corePath = $this->modx->getOption('mapstv.core_path', null, $this->modx->getOption('core_path').'components/mapstv/');
        $assetsUrl = $this->modx->getOption('mapstv.assets_url', null, $this->modx->getOption('assets_url').'components/mapstv/');

       	$js = $assetsUrl.'js/mgr/';
 	 	$this->modx->regClientCSS($assetsUrl.'css/mgr.css');

        $this->modx->regClientStartupScript($assetsUrl.'js/lib/Ext.ux.GMapPanel3.js');
        $this->modx->regClientStartupScript($assetsUrl.'js/mgr/mapstv.js');
        //$this->modx->regClientStartupScript('http://maps.google.com/maps/api/js?sensor=false');

        $dataArr = $this->modx->fromJSON($value);

        $this->setPlaceholder('street',$dataArr['street']);
        $this->setPlaceholder('housenumber',$dataArr['housenumber']);
        $this->setPlaceholder('zipcode',$dataArr['zipcode']);
        $this->setPlaceholder('city',$dataArr['city']);
        $this->setPlaceholder('state',$dataArr['state']);
        $this->setPlaceholder('country',$dataArr['country']);
        $this->setPlaceholder('latitude',$dataArr['latitude']);
        $this->setPlaceholder('longitude',$dataArr['longitude']);
    }

    public function getLexiconTopics(){
    	return array('mapstv:default');
    }
}
return 'MapsTvInputRender';
