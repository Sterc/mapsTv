if (typeof google === 'undefined') {
    document.write('<script src="http://maps.google.com/maps/api/js"><\/script>');
}

mapsTv = {};
 
mapsTv.panel = function(config) {
    config = config || {};

    Ext.get('modx-tv-reset-'+config.tvId).on('click', function(){
        //empty record
        config.record = [];
        Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);

        //empty fields
        Ext.getCmp('mapstv'+config.tvId+'-street').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-housenumber').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-zipcode').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-city').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-state').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-country').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-latitude').setValue('');
        Ext.getCmp('mapstv'+config.tvId+'-longitude').setValue('');

        //remove marker
        Ext.getCmp('tv'+config.tvId+'-gmappanel').clearMarkers();

    });

    Ext.EventManager.onWindowResize(function () {
        setTimeout(function(){
            var width = Ext.get('mapstv'+config.tvId).getViewSize().width;
            Ext.getCmp('tv'+config.tvId+'-gmappanel').setSize(width,250);
        },150);
    });

    Ext.apply(config,{
        border:false
        ,width: '100%'
        ,listeners: {}
        ,items:[{ 
            xtype: 'container'
            ,border: false
            ,layout: 'anchor'
            ,width:'100%'
            ,anchorSize: {width:'98%', height:'auto'}
            ,items: [{ 
                xtype: 'container'
                ,border: false
                ,layout: 'form'
                ,labelAlign: 'top'
                ,labelSeparator: ''
                ,width: '48%'
                ,anchor: 'left auto'
                ,style: 'float:left;'
                ,items: [{ 
                    xtype: 'textfield'
                    ,name: 'street'
                    ,id: 'mapstv'+config.tvId+'-street'
                    ,fieldLabel: _('mapstv.street')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.street
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.street = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                },{
                    xtype: 'textfield'
                    ,name: 'zipcode'
                    ,id: 'mapstv'+config.tvId+'-zipcode'
                    ,fieldLabel: _('mapstv.zipcode')
                    ,maxLength: 25
                    ,width:'98%'
                    ,value: config.record.zipcode
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.zipcode = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                },{
                    xtype: 'textfield'
                    ,name: 'state'
                    ,id: 'mapstv'+config.tvId+'-state'
                    ,fieldLabel: _('mapstv.state')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.state
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.state = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                }] 
            },{ 
                xtype: 'container'
                ,border: false
                ,layout: 'form'
                ,labelAlign: 'top'
                ,labelSeparator: ''
                ,width: '48%'
                ,anchor: 'right auto'
                ,style: 'float:right; '
                ,items: [{
                    xtype: 'textfield'
                    ,name: 'housenumber'
                    ,id: 'mapstv'+config.tvId+'-housenumber'
                    ,fieldLabel: _('mapstv.housenumber')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.housenumber
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.housenumber = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                },{
                    xtype: 'textfield'
                    ,name: 'city'
                    ,id: 'mapstv'+config.tvId+'-city'
                    ,fieldLabel: _('mapstv.city')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.city
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.city = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                },{
                    xtype: 'textfield'
                    ,name: 'country'
                    ,id: 'mapstv'+config.tvId+'-country'
                    ,fieldLabel: _('mapstv.country')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.country
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.country = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                }] 
            }] 
        },{
            xtype: 'container'
            ,style: 'clear:both;'
        },{
            xtype: 'button'
            ,text: _('mapstv.generate')
            ,style: 'margin: 10px 0'
            ,tv: config.tvId
            ,cls: 'x-btn primary-button _mapstv-button'
            ,handler: this.generate
            ,width:'98%'
        },{
            xtype: 'gmappanel'
            ,id: 'tv'+config.tvId+'-gmappanel'
            ,height: 250
            ,anchor:'100%'
            ,width:'100%'
            ,gmapType: 'map'
            ,zoomLevel: 14
            ,mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom']
            ,mapControls: ['GSmallMapControl','GMapTypeControl']               
            ,bodyStyle: 'padding: 5px;'
            ,listeners: {
                beforeRender: function(){
                    //Check if laltude and longitude are set
                    if(config.record.latitude != 0 && config.record.longitude != 0){
                        //Add marker with latitude and longitude
                        var point = new google.maps.LatLng(config.record.latitude, config.record.longitude);
                        this.setCenter = {
                            lat: config.record.latitude
                            ,lng: config.record.longitude
                            ,marker: {
                                title: config.record.street +' '+ config.record.housenumber
                                ,draggable: true
                            }                
                            ,listeners:{
                                drag: function(e){
                                    var LatLng = e.latLng;
									console.log('MOVE #1');
									console.log(LatLng.lat());
                                    Ext.getCmp('mapstv'+config.tvId+'-latitude').setValue(LatLng.lat());
                                    Ext.getCmp('mapstv'+config.tvId+'-longitude').setValue(LatLng.lng());
                                    Ext.getCmp('mapstv'+config.tvId+'-latitude').fireEvent('change');
                                    Ext.getCmp('mapstv'+config.tvId+'-longitude').fireEvent('change');           
                                }
                            }        
                        };
                    }else{
                        //Check if address is set
                        if(config.record.street && config.record.housenumber && config.record.zipcode && config.record.city && config.record.state && config.record.country){
                        //Add marker with address
                            this.setCenter = {
                                geoCodeAddr: config.record.street +' '+ config.record.housenumber +' '+ config.record.zipcode +' '+ config.record.city +' '+ config.record.state +' '+ config.record.country
                                ,marker: {
                                    title: config.record.street +' '+ config.record.housenumber
                                    ,draggable: true
                                }    
                                ,listeners:{
                                    drag: function(e){
                                        var LatLng = e.latLng;
                                        Ext.getCmp('mapstv'+config.tvId+'-latitude').setValue(LatLng.lat());
                                        Ext.getCmp('mapstv'+config.tvId+'-longitude').setValue(LatLng.lng());
                                        Ext.getCmp('mapstv'+config.tvId+'-latitude').fireEvent('change');
                                        Ext.getCmp('mapstv'+config.tvId+'-longitude').fireEvent('change');                                                   
                                    }
                                }    
                            };
                        }else{
                            //Nothing isset
                        }
                    }
                }
                ,afterrender: function(){
                    setTimeout(function(){
                        var vtabswidth = 132;
                        var padding = 45 + 30;
                        var width = Ext.get('modx-resource-settings').getViewSize().width - vtabswidth - padding;
                        Ext.getCmp('tv'+config.tvId+'-gmappanel').setSize(width,250);
                    },100);
                    Ext.get('modx-tv-tabs').on('click',function(){
                        var width = Ext.get('mapstv'+config.tvId).getViewSize().width;
                        Ext.getCmp('tv'+config.tvId+'-gmappanel').setSize(width,250);
                    });
                }
            }
        },{
            xtype: 'container'
            ,border: false
            ,layout: 'anchor'
            ,width:'100%'
            ,style: 'padding-top:10px;'
            ,anchorSize: {width:'98%', height:'auto'}
            ,items: [{
                xtype: 'container'
                ,border: false
                ,layout: 'form'
                ,labelAlign: 'top'
                ,labelSeparator: ''
                ,width: '48%'
                ,anchor: 'left auto'
                ,style: 'float:left;'
                ,items: [{
                    xtype: 'textfield'
                    ,name: 'latitude'
                    ,id: 'mapstv'+config.tvId+'-latitude'
                    ,fieldLabel: _('mapstv.latitude')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.latitude
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.latitude = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                }]
            },{
                xtype: 'container'
                ,border: false
                ,layout: 'form'
                ,labelAlign: 'top'
                ,labelSeparator: ''
                ,width: '48%'
                ,anchor: 'right auto'
                ,style: 'float:right;'
                ,items: [{
                    xtype: 'textfield'
                    ,name: 'longitude'
                    ,id: 'mapstv'+config.tvId+'-longitude'
                    ,fieldLabel: _('mapstv.longitude')
                    ,maxLength: 255
                    ,width:'98%'
                    ,value: config.record.longitude
                    ,listeners: { 
                        'change': function(){
                            MODx.fireResourceFormChange();
                            config.record.longitude = this.getValue();
                            Ext.get('tv'+config.tvId).dom.value = JSON.stringify(config.record);
                        }
                    }
                }]
            }]
        },{
            xtype: 'container'
            ,style: 'clear:both;'
        }] 
    });
    mapsTv.panel.superclass.constructor.call(this,config);
};
 
//Ext.extend(mapsTv.panel,MODx.Panel,{
Ext.extend(mapsTv.panel,Ext.Container,{
    generate: function(){
        var tvId = this.ownerCt.tvId
        var address = Ext.getCmp('mapstv'+tvId+'-street').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-housenumber').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-zipcode').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-city').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-state').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-country').getValue();
 
        Ext.getCmp('tv'+tvId+'-gmappanel').geoCodeLookup(address, {title: Ext.getCmp('mapstv'+tvId+'-street').getValue() +' '+ Ext.getCmp('mapstv'+tvId+'-housenumber').getValue(), draggable: true}, true, true, {
            drag: function(e){
                var LatLng = e.latLng;
                Ext.getCmp('mapstv'+tvId+'-latitude').setValue(LatLng.lat());
                Ext.getCmp('mapstv'+tvId+'-longitude').setValue(LatLng.lng());
                Ext.getCmp('mapstv'+tvId+'-latitude').fireEvent('change');
                Ext.getCmp('mapstv'+tvId+'-longitude').fireEvent('change');          
            }
        });
    }
});
Ext.reg('mapstv-panel',mapsTv.panel);
