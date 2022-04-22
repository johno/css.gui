import { useState } from 'react'
import { NumberInput } from 'css-gui'

export const NumberExample = () => {
  const [value, setValue] = useState<number>(16)
  return (
    <div>
      <NumberInput value={value} onChange={setValue} />
    </div>
  )
}
