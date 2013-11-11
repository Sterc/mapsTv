mapsTv = {};

mapsTv.panel = function(config) {
	config = config || {};
	Ext.apply(config,{
		border: false
		,items:[{ 
			xtype: 'panel'
			,border: false
			,layout: 'column'
			,anchor: '100%'
			,width: 600
			,items: [{ 
				xtype: 'panel'
				,border: false
				,layout: 'form'
				,labelAlign: 'top'
				,labelSeparator: ''
				,columnWidth: .5 
				,items: [{ 
					xtype: 'textfield'
					,name: 'street'
					,id: 'mapstv'+config.tvId+'-street'
					,fieldLabel: _('mapstv.street')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.street
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				},{
					xtype: 'textfield'
					,name: 'housenumber'
					,id: 'mapstv'+config.tvId+'-housenumber'
					,fieldLabel: _('mapstv.housenumber')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.housenumber
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				},{
					xtype: 'textfield'
					,name: 'zipcode'
					,id: 'mapstv'+config.tvId+'-zipcode'
					,fieldLabel: _('mapstv.zipcode')
					,maxLength: 25
					,anchor: '100%'
					,value: config.record.zipcode
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				}] 
			},{ 
				xtype: 'panel'
				,border: false
				,layout: 'form'
				,labelAlign: 'top'
				,labelSeparator: ''
				,columnWidth: .5 
				,items: [{
					xtype: 'textfield'
					,name: 'city'
					,id: 'mapstv'+config.tvId+'-city'
					,fieldLabel: _('mapstv.city')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.city
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				},{
					xtype: 'textfield'
					,name: 'state'
					,id: 'mapstv'+config.tvId+'-state'
					,fieldLabel: _('mapstv.state')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.state
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				},{
					xtype: 'textfield'
					,name: 'country'
					,id: 'mapstv'+config.tvId+'-country'
					,fieldLabel: _('mapstv.country')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.country
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				}] 
			}] 
		},{
			xtype: 'button'
			,text: _('mapstv.generate')
			,style: 'margin: 10px 0'
			,width: 585
			,cls: 'mapstv-button'
			,tv: config.tvId
			,handler: this.generate
		},{
            xtype: 'gmappanel'
            ,id: 'tv'+config.tvId+'-gmappanel'
			,width: 585
			,height: 250
			,gmapType: 'map'
            ,zoomLevel: 14
            ,mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging']
            ,mapControls: ['GSmallMapControl','GMapTypeControl']               
            ,bodyStyle: 'padding: 5px;'
            ,listeners: {
                afterRender: function(){
                	//Check if laltude and lonitude are set
                	if(config.record.latitude > 0 && config.record.longitude > 0){
                		//Add marker with latitude and longitude
                		var point = new google.maps.LatLng(config.record.latitude, config.record.longitude);
                		this.addMarker(point, {title: config.record.street +' '+ config.record.housenumber, draggable: true}, false, true, {});
                	}else{
                		//Check if address is set
                		if(config.record.street && config.record.housenumber && config.record.zipcode && config.record.city && config.record.state && config.record.country){
                			//Calculate latitude and longitude and add marker
                			this.geoCodeLookup(config.record.street +' '+ config.record.housenumber +' '+ config.record.zipcode +' '+ config.record.city +' '+ config.record.state +' '+ config.record.country, {title: config.record.street +' '+ config.record.housenumber, draggable: true}, false, true, {});
                		}else{
                			//Nothing isset hide Google Map, latitude and longitude

                		}
                	}
                }
            }
        },{
			xtype: 'panel'
			,border: false
			,layout: 'column'
			,anchor: '100%'
			,width: 600
			,items: [{
				xtype: 'panel'
				,border: false
				,layout: 'form'
				,labelAlign: 'top'
				,labelSeparator: ''
				,columnWidth: .5 
				,items: [{
					xtype: 'textfield'
					,name: 'latitude'
					,id: 'mapstv'+config.tvId+'-latitude'
					,fieldLabel: _('mapstv.latitude')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.latitude
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				}]
		   	},{
				xtype: 'panel'
				,border: false
				,layout: 'form'
				,labelAlign: 'top'
				,labelSeparator: ''
				,columnWidth: .5
				,items: [{
					xtype: 'textfield'
					,name: 'longitude'
					,id: 'mapstv'+config.tvId+'-longitude'
					,fieldLabel: _('mapstv.longitude')
					,maxLength: 255
					,anchor: '100%'
					,value: config.record.longitude
					,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
				}]
		   	}]

		}] 
	});
	mapsTv.panel.superclass.constructor.call(this,config);
};
Ext.extend(mapsTv.panel,MODx.Panel,{
	generate: function(){
		var tvId = this.ownerCt.tvId
		var address = Ext.getCmp('mapstv'+tvId+'-street').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-housenumber').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-zipcode').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-city').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-state').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-country').getValue();
		//console.log(address);

		Ext.getCmp('tv'+tvId+'-gmappanel').clearMarkers();
		Ext.getCmp('tv'+tvId+'-gmappanel').geoCodeLookup(address, {title: Ext.getCmp('mapstv'+tvId+'-street').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-housenumber').getValue(), draggable: true}, false, true, {});
		var LatLng = Ext.getCmp('tv'+tvId+'-gmappanel').markers[0].position;
		Ext.getCmp('mapstv'+tvId+'-latitude').setValue(LatLng.$a);
		Ext.getCmp('mapstv'+tvId+'-longitude').setValue(LatLng.ab);
	}
});
Ext.reg('mapstv-panel',mapsTv.panel);
