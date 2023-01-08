export default function Input({ id, label, placeholder, type, register, errorsMessage }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} {...register} />
      <span>{errorsMessage}</span>
    </div>
  )
}