export default function Select({ id, label, register, errorsMessage }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register}></select>
      <span>{errorsMessage}</span>
    </div>
  )
}