/*
    todos pos evntos estão diospostos nesse arquivo

*/ 

$(document).ready(function(){
    //Inicializa o data
    inicializa_datas();
    funcao_ajax_pega_lista_ator();

    $("#btn_icone_imprime").click(function(e){
        imprime_relatorio_individual();
    });

    $( "#senha" ).keypress(function( event ) {
        if ( event.which == 13 ) {
           alert("aperto entyer");
           funcao_ajax_valida($("#senha").val() );
            $("#senha").val('');
        }
        
      });

    $("#btn_filtro").click(function(){
        alert("vai redimencionar");
        funcao_ajax_pega_ator();
    });

    /*========= Evento_1 ==========
    Sempre q o botao de selecao for selecionado visivel o botao e tabela de horario
    */
    $("#selecao").click(function(){
    
    var ator = $("#selecao option:selected").val();
    $(".botao").css("display","none");	
    $(".validacao").css("display", "none");
    
    if(ator != "nenhum"){
            ator_global = ator;//atualiza o valor do ator_global lopgo q selecionado
            funcao_ajax_pega_ator();

            $(".validacao").animate({
                 height: "toggle"
             });

            $("#btn_validacao").click( function(){

                funcao_ajax_valida($("#senha").val() );
                $("#senha").val('');
            });
         

            if(ator == "adm"){
                window.location.href = "pagina_adm.html"
            }
            else{
                
                console.log(ator);
                
                console.log("passei");
            }
        }
        else {
           // $(".qtd_horas").css("display","none");
            //$(".horas_trabalhadas").css("display","none");
            //$(".botao").css("display","none");
        }
        
    
        // $("#filtro_ini").val(ini); 
        // $("#filtro_fim").val(fim); 
        // console.log("ini->"+ ini);

    });


    $(".botao").click( function(){
        //alert(flag_global);

        //Seta hora atual em time com a hora do navegador navegador
        
    
        var ator = $("#selecao option:selected").val();
        if(ator != "nenhum"){
            
            var matricula = $("#selecao option:selected").val();
            var start =  $(this).children("div").attr("class");
            
            //Se flag == 1 ele n esta com um dia de trabalho em aberto
            // O botao de inicia trabalho e ativado
            if(start == "btn_start"){
                funcao_ajax_manda_dado();
                alert("vai começa a tyrabalhar");
                $(this).html('<div class="btn_stop"> Para de trampa </div>');
            }
            
            else if(start == "btn_stop"){
                funcao_ajax_atualiza_dado();
                $(this).html('<div class="btn_start"> Voltar ao trabalho </div>');
            }

        }
        else{
            $(".qtd_horas").css("display","none");
        }
    });


});