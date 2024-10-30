<script lang="ts">
    export let data;
</script>

<div>
	<h2>Usuario Logueado</h2>
	<div>
	  {#if 'id' in data.user}
		<p>ID: {data.user.id}</p>
	  {/if}
	  {#if 'usuario' in data.user}
		<p>Usuario: {data.user.usuario}</p>
	  {/if}
	  {#if 'rol_id' in data.user}
		<p>Rol ID: {data.user.rol_id}</p>
	  {/if}
	</div>
</div>

<div>
	<h2>Verificación de Conexión a la Base de Datos</h2>
	{#if data.isConnected}
	  <p>Conexión exitosa</p>
	{:else}
	  <p>Error al conectar a la base de datos</p>
	{/if}
</div>