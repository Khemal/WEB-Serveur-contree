//var nombre=prompt('Entrez un nombre entre 0 et 999 :');


function ecrire(nombre){

	var unite=nombre % 10,dizaine=(nombre % 100 - unite)/10,centaine=(nombre % 1000 -nombre % 100)/100;

	var chiffres=["","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf"];
	var machin=["","dix","vingt","trente","quarante","cinquante","soixante","soixante-dix","quatre-vingt","quatre-vingt-dix","cent"];

	var resunite,resdizaine,rescentaine;
	
	if(nombre<0 ||nombre>999){
		return 'sale con';
	}else if(nombre ===0){
		return 'zéro';
	}else{
		resunite=(unite===1 && dizaine >0 && dizaine !==8 ? 'et-' : '')+chiffres[unite];
		
		if(dizaine==1){
			resdizaine=chiffres[10+unite];
			resunite="";
		}else{
			resdizaine=machin[dizaine];
		}
		
		if(centaine>1){
			rescentaine=chiffres[centaine]+" cent";
		}else{
			rescentaine="cent";
		}
	};
	
	if(nombre<10){
		return resunite
	}else if(nombre<100){
		return resdizaine+" "+resunite
	}else{
		return rescentaine+" "+resdizaine+" "+resunite
	};
};

var userEntry;
while(userEntry = prompt('Entrez un nombre entre 0 et 999 :')){alert(ecrire(userEntry))};