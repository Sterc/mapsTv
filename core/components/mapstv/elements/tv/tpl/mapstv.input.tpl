<input type="hidden" id="tv{$tv->id}" name="tv{$tv->id}" value="{$tv->value|escape}" />
<div id="mapstv{$tv->id}" style="width:100%;"></div>
<script type="text/javascript">

myTV{$tv->id} = MODx.load{literal}({
{/literal}
	xtype: 'mapstv-panel',
	renderTo: 'mapstv{$tv->id}',
	tvFieldId: 'tv{$tv->id}',
	tvId: '{$tv->id}',
	record: {
		street: "{$street}"
		,housenumber: "{$housenumber}"
		,zipcode: "{$zipcode}"
		,city: "{$city}"
		,state: "{$state}"
		,country: "{$country}"
		,latitude: "{$latitude}"
		,longitude: "{$longitude}"
	}
{literal}
});
{/literal}

</script>