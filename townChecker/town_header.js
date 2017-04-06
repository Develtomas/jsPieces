<?CJSCore::Init(array('ls'));?>
var currCity = BX.localStorage.get('cityGeo');
if (!currCity) {
	<?$arData = ALX_GeoIP::GetAddr('109.195.20.154'); $arCity = $arData['city'];?>
	currCity = '<?echo $arCity;?>';

	if (!currCity || currCity === null || currCity != 'Хабаровск') {
	currCity = 'Владивосток';
	}

	BX.localStorage.set('cityGeo', currCity);
}

window.addEventListener('load', firstTown); 
function firstTown() {
	var townList = ['Владивосток', 'Хабаровск'];
	for (var i=0; i < townList.length; i++) {
		if (townList[i] == currCity) {
			$('#townDef').append("<option selected value="+currCity+">"+currCity+"</option>");
		}
		else {
			$('#townDef').append("<option value="+townList[i]+">"+townList[i]+"</option>");
		}
	}
	//$("#townDef option[value="+currCity+"]").prop('selected', true);
}

var t = document.getElementById('townDef');
t.addEventListener('change', townSwitch);
function townSwitch() {
    currCity = $("#townDef").val();
    BX.localStorage.set('cityGeo', currCity);
}