import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function AgregarProducto() {

    const { user } = useContext(UserContext)
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
        marca_id: "", //Foreign key de marca
    })
    const [marcas, setMarcas] = useState([])//Guarda la lista de marcas de la API
    const [errors, setErrors] = useState({})//guarda los mensajes cuando el usuario deja titulo vacio, precio en 0, etc
    const [loading, setLoading] = useState(false)//Deshabilita el boton de "Guardar" una vez presionado para que no cargue mas de una vez el producto
    const [successMessage, setSuccessMessage] = useState("") //Guarda mensaje de confirmacion

    // Trae la lista de marcas desde el backend
    useEffect(() => {
        const getMarcas = async () => {
            try {
                const res = await fetch(`${API_URL}/marcas/`)
                const data = await res.json()
                setMarcas(data)
            } catch (err) {
                console.error("Error al traer marcas: " + err)
            }
        }
        getMarcas()
    }, [API_URL])

    //Si no es administrador no lo deja tener acceso
    if (!user.admin) {
        return (
            <section className='flex-1 flex justify-center items-center'>
                <p className='text-red-600 text-4xl font-bold'>
                    No tienes acceso a este formulario.
                </p>
            </section>
        )
    }
    //actualiza el formulario cada vez que se realiza un cambio
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    //Valida que los campos se llenen de la forma correcta
    const validate = () => {
        const newErrors = {}

        if (!form.nombre.trim()) newErrors.nombre = "El titulo es obligatorio"

        if (!form.precio) {
            newErrors.precio = "El precio es obligatorio"
        } else if (Number(form.precio) <= 0) {
            newErrors.precio = "El precio debe ser mayor a 0"
        }

        if (!form.stock && form.stock !== 0) {newErrors.stock = "El stock es obligatorio"
        } else if (Number(form.stock) < 0) {
            newErrors.stock = 'El stock no puede ser negativo'
        }

        if (!form.marca_id) newErrors.marca_id = "La marca es obligatoria"

        return newErrors
    }
    //Envia los datos del formulario al backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccessMessage("")
        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        //Le envia la API los datos para el POST
        try {
            const res = await fetch(`${API_URL}/articulos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: form.nombre,
                    stock: Number(form.stock),
                    precio: Number(form.precio),
                    marca_id: Number(form.marca_id),
                    activo: true
                })
            })
            //Recibe la respuesta de la API, si hay error y rehabilita el boton de envio
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setSuccessMessage("¡Producto agregado con éxito!")
                setErrors({})
                setForm({
                    nombre: "",
                    precio: "",
                    stock: "",
                    marca_id: "",
                })
            }
        } catch (err) {
            console.error("Error al cargar los datos a la api: " + err)
        } finally {
            setLoading(false)
        }
    }
    //Muestra cuando un product se guardo corretamente
    return (
        <section className='flex-1 flex flex-col items-center pt-10 px-4'>
            <p className='text-2xl font-bold mb-6'>Agregar producto</p>

            {successMessage && (
                <div className="w-full max-w-md mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded text-sm text-center">
                    {successMessage}
                </div>
            )}
            {/*Creacion de los campos para ingresar el nombre */}
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-zinc-800 p-6 rounded '>
                <div>
                    <label className='block text-md mb-1 mt-2'>titulo</label>
                    {errors.nombre && <p className=' text-sm text-red-700 animate-pulse'>{errors.nombre}</p>}
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder='Titulo'
                        className='w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700'
                    />
                </div>
                {/*Creacion de los campos para ingresar el precio*/}
                <div>
                    <label className='block text-md mb-1 mt-6'>Precio</label>
                    {errors.precio && <p className=' text-sm text-red-700 animate-pulse'>{errors.precio}</p>}
                    <input
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        placeholder='$50.000'
                        className='w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700'
                    />
                </div>

                {/*Menu desplegable para elegir la marca del producto */}
                <div>
                    <label className='block text-md mb-1 mt-6'>Marca</label>
                    {errors.marca_id && <p className=' text-sm text-red-700 animate-pulse'>{errors.marca_id}</p>}
                    <select
                        name="marca_id"
                        value={form.marca_id}
                        onChange={handleChange}
                        className='w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-white'
                    >
                        <option value="">Selecciona una marca</option>
                        {marcas.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {/*Campo para ingresar el stock */}
                <div>
                    <label className='block text-md mb-1 mt-6'>Stock</label>
                    {errors.stock && <p className=' text-sm text-red-700 animate-pulse'>{errors.stock}</p>}
                    <input
                        type="text"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder='Stock del producto'
                        className='w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700'
                    />
                </div>
                {/*Boton para el envio del formulario*/}
                <button 
                    type='submit' 
                    disabled={loading}
                    className={`w-full my-4 rounded-lg py-4 transition-colors ${
                        loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    }`}
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </section>
    )
}