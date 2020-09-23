const link = (tipo) => 'https://websegundoparcial.herokuapp.com/api/' + tipo;

export const agregarUsuario = async (usuario, tipo) => {
  try {
    let response = await fetch(link(tipo), {
      method: 'POST',
      body: usuario,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Incorrecto');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const obtenerUsuarios = async (tipo) => {
  try {
    let response = await fetch(link(tipo));
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Incorrecto');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const eliminarUsuario = async (id, tipo) => {
  try {
    let response = await fetch(link(tipo) + '/' + id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Incorrecto');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const actualizarUsuario = async(id, usuario, tipo) => {
  try {
    let response = await fetch(link(tipo) + '/' + id, {
      method: 'PUT',
      mode: 'cors',
      body: usuario,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Incorrecto');
    }
  } catch (error) {
    alert(error.message);
  }

  
}
