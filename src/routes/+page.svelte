<script lang="ts">
    export let data;
</script>

<div>
	<h2>Usuario Logueado</h2>
	<div>
	  <p>ID: {data.user.id}</p>
	  <p>Usuario: {data.user.usuario}</p>
	  <p>Rol ID: {data.user.rol_id}</p>
	</div>
  </div>