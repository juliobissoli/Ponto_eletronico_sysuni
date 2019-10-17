var id_global;
var nome_global;
var data_global;
var hora_inicio_global;
var hora_fim_global;
var flag_global;
var ator_global;

function funcao_ajax_manda_dado(){
    return $.ajax({
        url: 'php/envia_dados.php',
        type: "post",
        //dataType: "JSON",
        data:$("#form_selecao").serialize(),
        success:function(data){
            //alert(data);
           // $(".horas_trabalhadas").css("display","none");
            funcao_ajax_pega_ator();
    },
        error: function(){
            alert("deu ruim");
        }
            //success:imprime_lista(dado_Servidor)
        });
}

function funcao_ajax_manda_dado_adm(nome, senha){
	alert("vai inserir->"+nome+"senha->"+senha);
    return $.ajax({
        url: 'php/envia_dados_adm.php',
        type: "post",
        //dataType: "JSON",
        data:{usuario:nome, pass:senha},
        success:function(data){
            // funcao_ajax_pega_ator();
    },
        error: function(){
            alert("deu ruim");
        }
     });
}

// Atualiza a linha referente ao id que foi selecionado
function funcao_ajax_atualiza_dado(){
    alert("vai atualizar");
    //alert(id_global);
    $.ajax({
        url:"php/atualiza_dados.php",
        type:"post",
        data:{id:id_global},
        success:function(data){
            //alert(data);
            //$(".horas_trabalhadas").css("display","none");
            funcao_ajax_pega_ator();
        },
        error:function(){
            alert("DEU RUIM UPDATE");
        }
    });

}
function monta_lista_atores(data){
	let str = '<option value="nenhum">Nenhum</option>';
		// str += '<option value="adm"><a href="/pagina_adm.html">Administrador</a></option>';
		for(i = 0; i< data.length; i++){
			str+= '<option value="'+data[i].nome+'">'+data[i].nome+'</option>';
		}
		str+='</select>';
	$("#selecao").html(str);		
}

function funcao_ajax_pega_lista_ator(){
	// alert("vai peguar o alisytas ");
	$.getJSON("php/pega_lista_atores_adm.php", "campo1="+ator_global+"&campo2="+ini+"&campo3="+fim, function( data ) {
		// alert(data);
		monta_lista_atores(data);
	})
	//.done(imprime_lista);
}

// TODO: GARANTIR QUE O 'data' retorne no formato correto... ATUALMENTE ESTÁ SAINDO NA FORMA DE STRING
function funcao_ajax_pega_ator(){
	var ini = $("#filtro_ini").val();
	var fim = $("#filtro_fim").val();
	console.log("data ini->"+ini+" DATA FIM ->"+ fim);

	$.getJSON("php/pega_ator.php", "campo1="+ator_global+"&campo2="+ini+"&campo3="+fim, function( data ) {
		console.log(data)
	})
	.done(imprime_lista);
}

function imprime_lista(data){
	var  valor = data[0];
	var str = ''
	flag_global = "1";
	var horas_trab_mes = [0,0]; //vetor do tipo [hora, minuto], com a quantidade total de horas trabalhadas no mes; 
	var tab_dia = [0,0]; //vetor do tipo [hora, minuto], com a quantidade total de horas trabalhadas no dia; 
	var data_atual = {ano:'0000', mes:'0', fim:'0', inicio:'0'}; //Objetos do tipo [ano, mes, dia fim, dia inicio], com o mes ferenciado na tabela; 
	// var periodos = [data_atual];
	for(i=0; i<data.length; i++){
		if(data[i].flag == "0") {
			id_global = data[i].id;
			nome_global = data[i].nome;
			data_global = data[i].data_trab;
			hora_inicio_global = data[i].hora_inicio;
			hora_fim_global = data[i].hora_fim;
			flag_global = data[i].flag;
		}
		else{
			tab_dia = calcula_hora_dia( data[i].hora_inicio,  data[i].hora_fim);
			horas_trab_mes = soma_hora_dia( horas_trab_mes , tab_dia);
			data_atual =  data[i].data_trab;
		}
		//Monta a lista com as valores recebidos do BD
		str += '<div class="linha titulo"><div class="celula">'+data[i].data_trab+'</div><div class="celula">'+ data[i].hora_inicio +' </div> <div class="celula">'+data[i].hora_fim+'</div><div class="celula">'+formata_hora(tab_dia) +'</div></div>'
	} 
	monta_relatorio_topo(ator_global, formata_hora(horas_trab_mes));
	$(".tabela_informativa").html(str);

	expande_div( $(".horas_trabalhadas") );

}

function expande_div(div){
	// alert("vai verificar");
	if(! div.is(':visible')){
		div.animate({
			height: "toggle"
		});
	}
}

function comprime_div(div){
	// alert("vai verificar");
	if(div.is(':visible')){
		div.animate({
			height: "toggle"
		});
	}
}

//===========Funcao q gera relatotio com a quantidade horas trabalhadas no mes
function monta_relatorio_topo(nome, qtd_horas){
	$("#relatorio_titulo_nome").text("Relatorio mensal de: "+nome);
	$("#relatorio_horas_tot").text(qtd_horas);
}

function monta_relatorio_topo_adm(nome){
	// <i class="fas fa-trash"></i>
	$("#relatorio_titulo_nome").text("Relatorio mensal de: "+nome+'<i class="fas fa-trash"></i>');
	// $("#relatorio_horas_tot").text(qtd_horas);
}

function inicializa_datas(){
	fim = dataAtualFormatada();
	ini = dataPrimeiroDiaMesFormatada();
	$("#filtro_ini").val(ini); 
	$("#filtro_fim").val(fim);
}
//==========Calcula a quandidade de oaras trabalhadas em um dia
function calcula_hora_dia( inicio, fim){
	inicio_split = inicio.split(":");
	fim_split = fim.split(":");
	hora_inicio = parseInt(inicio_split[0], 10);
	hora_fim =  parseInt(fim_split[0], 10);
	minutos_fim =  parseInt(fim_split[1], 10);
	minutos_inicio = parseInt(inicio_split[1], 10);
	result  =  ((hora_fim * 60)+ minutos_fim)  - ((hora_inicio * 60)+ minutos_inicio);
	result_horas = Math.floor(result/60);
	result_minutos = result%60;
	//console.log('orainicio ('+inicio +')- fim('+fim+') = ' + result_horas+':'+ result_minutos.toFixed(2));
	var saida = [result_horas,result_minutos ];
	return saida;
}


function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+ diaF;
}

function dataPrimeiroDiaMesFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-01";
}


// Retorna um vetor do tipo [ano, mes, dia]
function pega_mes_atual(){
	fim = dataAtualFormatada();
	ini = dataPrimeiroDiaMesFormatada();

	$("#filtro_ini").val(ini); 
	$("#filtro_fim").val(fim); 
	//alert("ini->"+ ini + "fim->"+fim);
	str= 'De <input type="date" id="filtro_ini"> a <input type="date" id="filtro_fim">';
	// str = '<div class="filtro"><label > inicio:<input type="date" id="filtro_ini"> </label>	<label>	fim:<input type="date" id="filtro_fim"> <button id ="filtro_adm">Ir</button></label> </div>' ;
	//return str;
	}


//Verifica se ou ano mes existe;
// function ano_mes_existe(periodos, ano, mes){
// 	for(i = 0; i < periodos.length; i++){
// 		//alert(periodos[i].mes +'comp ->'+ mes);
// 		if(periodos[i].mes == mes || periodos[i].ano == ano ){
// 			return true;
// 		}
// 	}
// 	return false;
// }

//=========Faz a soma e com verte em horas 
function soma_hora_dia(  hora_atual, tab_dia){
	
	minutos = hora_atual[1]+tab_dia[1];
	horas = hora_atual[0] + tab_dia[0]
	if(minutos >= 60){
		minutos = minutos%60;
		horas++;
	}
	result = [horas, minutos];
	//console.log('hora trab no nodia = ' + tab_dia[0] +':'+tab_dia[1]  +' hora atual '+ result);
	return result;
}

function imprime_botao(flag){
	console.log("imprime_botao flag = "+flag);
	if(flag == "1"){
		alert
		$(".botao").html('<div class="btn_start"> Começar a trampa </div>');
	}
	else if(flag == "0"){
		$(".botao").html('<div class="btn_stop"> Para de trampa </div>');
	}

	if( !( $(".botao").is(":visible") ) ){

		// $(".horas_trabalhadas").animate({
		// 	height: "toggle"
		// });

		$(".botao").animate({
			height: "toggle"
		});

	}
}

function formata_hora(hora){
	horas = hora[0];
	minutos = hora[1];
	if(horas < 10){
	 horas = "0"+horas;
	}
	if(minutos < 10){
	 minutos = "0"+minutos;
	}
	   formatada = horas+":"+minutos;
	return formatada;
   }

   function formata_hora_decimal(hora){
	let horas = hora[0];
	let minutos = hora[1];
	let formatada = horas+(minutos / 60);
	return formatada;
   }
function imprime_admin(){
	//console.log("imprime_botao flag = "+flag);
	$(".caixa_direita").html('<div class="filtro"> inicio:<input type="date" nomo="filtro_fim> fim:<input type="date" nomo="filtro_fim">  </div>');

	if( !( $(".caixa_direita").is(":visible") ) ){

		$(".caixa_direita").animate({
			height: "toggle"
		});

	}
}



function imprime_lista_arquivo(data){
alert("gera arquivo");
  var _gerarCsv = function(){	 
	var  valor = data[0];
	var dia_i;
	var str = ''
	flag_global = "1";
	var horas_trab_mes = [0,0]; //vetor do tipo [hora, minuto], com a quantidade total de horas trabalhadas no mes; 
	var tab_dia = [0,0]; //vetor do tipo [hora, minuto], com a quantidade total de horas trabalhadas no dia; 
	var data_atual = {ano:'0000', mes:'0', fim:'0', inicio:'0'}; //Objetos do tipo [ano, mes, dia fim, dia inicio], com o mes ferenciado na tabela; 
	// var periodos = [data_atual];
	for(i=0; i<data.length; i++){
		if(! (data[i].flag === "0")) {
			console.log('glag_imprime->{}' + data[i].flag);
			tab_dia = calcula_hora_dia( data[i].hora_inicio,  data[i].hora_fim);
			horas_trab_mes = soma_hora_dia( horas_trab_mes , tab_dia);
			data_atual =  data[i].data_trab;
			str += (i+1)+";"+data[i].data_trab+';'+ data[i].hora_inicio +';'+data[i].hora_fim+';'+formata_hora(tab_dia) +';'+formata_hora_decimal(tab_dia)+'\n'

		}
		//Monta a lista com as valores recebidos do BD

	} 
	//periodo = pega_mes_atual();
	
	// var result = ',Relatorio referente ao periodo de '+ data[data.length -1 ].data_trab+' a '+  data[0].data_trab +',,\n';
	var result = ';;Relatorio atual: '+data[0].nome+';;';
	result += '\n ;Total hosras/trab:;'+formata_hora(horas_trab_mes)+';Decimal:;'+formata_hora_decimal(horas_trab_mes)+'\n';
	result += '\n ;Data;hora inicio; hora fim ; Qtd. horas trabalhadas;  Qtd. horas trabalhadas/decimal \n';

	result+= str;

	console.log(result);

	//monta_relatorio_topo(ator_global, horas_trab_mes);

		var hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:application/vnd.ms-excel,' + encodeURI(result);
		// hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(result);
		hiddenElement.target = '_blank';
		hiddenElement.download = 'Relatorio-'+data[0].nome+'-'+  data[data.length -1 ].data_trab +'~~'+ data[0].data_trab +'.csv';
		hiddenElement.click();
	}
	_gerarCsv();
}


 function imprime_relatorio_individual(){
	var ini = $("#filtro_ini").val();
	var fim = $("#filtro_fim").val();
	$.getJSON("php/pega_ator.php", "campo1="+ator_global+"&campo2="+ini+"&campo3="+fim, function( data ) {
		console.log(data)
	})
	.done(imprime_lista_arquivo);

}

function funcao_ajax_valida_adm(senha){
	alert("valida adm");
	console.log("senha->"+ senha);
	$.getJSON("validacao.php", "campo1="+"adm"+"&campo2="+senha, function( data ) {
		console.log("tamho do data->"+data.length);
		//.done(verifica);
		if(data === ""){
		 alert("senha incorreta");	
		}
		else{
			comprime_div( $(".login_adm") );
		}
	})
	//.done(vericacao);
}

function funcao_ajax_valida(senha){
	console.log("senha->"+ senha);
	$.getJSON("validacao.php", "campo1="+ator_global+"&campo2="+senha, function( data ) {
		console.log("tamho do data->"+data.length);
		//.done(verifica);
		if(data == ""){
		 alert("deu ruim");	
		}
		else{
			$(".validacao").animate({
				height: "toggle"
			});
			//funcao_ajax_pega_ator();
			imprime_botao(flag_global);
		}
	})
	//.done(vericacao);
}
