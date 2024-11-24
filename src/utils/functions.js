// Recibe un array de objetos, donde cada uno tiene una propiedad price y quantity
// devuelve el precio total
export const calculate_total_price = (items) =>{
  return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}