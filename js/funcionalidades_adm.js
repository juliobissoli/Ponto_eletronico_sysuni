
function funcao_ajax_pega_lista_ator_adm(){
	$.getJSON("php/pega_lista_atores_adm.php", campo1=""+ator_global+"&campo2="+ini+"&campo3="+fim, function( data ) {
		 alert(data);
		monta_lista_usuarios_adm(data);
	})
	//.done(imprime_lista);
}

function monta_lista_usuarios_adm(data){
	alert("vai vai escrever htnl ");
	let str = '<div class="topo_tabela">lista de Usuarios</div>';
		//str += '<option value="adm"><a href="/pagina_adm.html">Administrador</a></option>';
		for(i = 0; i< data.length; i++){
			str+=  '<div class="linha linha_relatorio btn_usuario" ><div class="nome_user" >'+ data[i].nome+'</div><i class="fas fa-user-edit"></i> <i class="far fa-trash-alt"></i> </div>';
        }
	$(".dascricao_user").html(str);		
}