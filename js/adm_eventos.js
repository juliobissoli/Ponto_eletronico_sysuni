function funcao_ajax_pega_ator_adm(ator, data_ini, data_fim){
    alert("vai teia 2");
    console.log(ator, data_ini, data_fim);
	$.getJSON("pega_dados_adm.php", "campo1="+ator+"&campo2="+data_ini+"&campo3="+data_fim , function( data ) {
        console.log(data);
        alert(data);
    })
    .done(imprime_lista);
}




$(document).ready(function(){

    $('.btn_usuario').click(function(){
        alert("clicoo");
    });
    
    // funcao_ajax_pega_lista_ator_adm();
    
    $("#btn_validacao_adm").click(function(){    
        alert("clicoo");
        funcao_ajax_valida_adm( $("#senha").val() );
        $("#senha").val('');
        funcao_ajax_pega_lista_ator_adm();
    });

    

    $(".botao_add_conta").click(function (){
        expande_div( $(".area_inputs_linha") );
    });

    $(".cancelar_add").click(function(){
        comprime_div( $(".area_inputs_linha") );
    });

    $("#btn_add_conta").click(function(){
        alert("vai add");
        if(  $("#nome_imput_add").val()  != ""  &&  $("#senha_imput_add").val() ){
            funcao_ajax_manda_dado_adm( $("#nome_imput_add").val() , $("#senha_imput_add").val() )
        }
        else{
            alert("N pode deiaxr vazio");
        }
    });

    $("#selcao").click(function(){
        console.log("vai expandior descrição");
        var ator = $("#selecao option:selected").val();
        if(ator != "nenhum"){
         $(".descricao_user").text(ator);
            expande_div( $(".descricao_user_linha") );
        }
    });
    // $("#selecao").click(function(){
    
    //     var ator = $("#selecao option:selected").val();
    //     $(".botao").css("display","none");	
    //     $(".validacao").css("display", "none");
        
    //     if(ator != "nenhum"){
    //             // alert("data gora->");
    //            // monta_relatorio_topo(ator, "3:73");
    //             ator_global = ator;//atualiza o valor do ator_global lopgo q selecionado
    //             funcao_ajax_pega_ator();
    
    //             $(".validacao").animate({
    //                  height: "toggle"
    //              });
    
    //             $("#btn_validacao").click( function(){
    
    //                 funcao_ajax_valida($("#senha").val() )
    //                 $("#senha").val('');
    //             });
    
    //             if(ator == "adm"){
    //                 window.location.href = "pagina_adm.html"
    //             }
    //             else{
                    
    //                 console.log(ator);
                    
    //                 console.log("passei");
    //             }
    //         }
    //         else {
    //         }
            
        
    
    //     });

});