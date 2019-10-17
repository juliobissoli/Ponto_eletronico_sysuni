function funcao_ajax_pega_ator_adm(ator, data_ini, data_fim){
    console.log("vai teia 2");
    console.log(ator, data_ini, data_fim);
	$.getJSON("pega_dados_adm.php", "campo1="+ator+"&campo2="+data_ini+"&campo3="+data_fim , function( data ) {
        console.log(data);
        alert(data);
    })
    .done(imprime_lista);
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

$(document).ready(function(){
    data_fim = dataAtualFormatada();
    data_inicio = dataPrimeiroDiaMesFormatada()
    $("#filtro_ini").val(data_inicio); 
    $("#filtro_fim").val(data_fim); 

    
    $("#filtro_adm").click(function(){    
        ator = $("#selecao option:selected").val();
        
        data_ini  = $("#filtro_ini").val();
        data_fim  = $("#filtro_fim").val();
        if(ator =='' |  data_ini == '' | data_fim ==''){
           
            alert("tal faltando uma coisa");
        }
        else{
            $(".horas_trabalhadas").animate({
		    	height: "toggle"
	    	});
            alert("data ini->"+ data_ini  +" data fim ->"+ data_fim);
            
            funcao_ajax_pega_ator_adm(ator, data_ini, data_fim);
        }
       

    });

    $("#selecao").click(function(){
    var ator = $("#selecao option:selected").val();
    // $(".filtro_todo").animate({
    //     height: "toggle"
    // });
    // $(".barra_ator_adm").animate({
    //     height: "toggle"
    // });
        if(ator != "Nenhum"){
            $(".nome_ator").text(ator);
            $(".usuario_ator").text(ator);
            $(".acoes").html('<div class="btn_icone"><i class="fas fa-user-edit"></i></div> <div class="btn_icone"> <i class="far fa-trash-alt"></i> </div>   <div class="btn_icone add_icone"><i class="fas fa-plus"></i></div>');
            
        }
        // $(".filtro_todo").animate({
        //     height: "toggle"
        // });
        // $(".barra_ator_adm").animate({
        //     height: "toggle"
        // });

        
    });

    $(".add_icone").click(function(){
        alert("vai saçm");
    });

});