import * as Select from '@radix-ui/react-select'
import { EditorProps } from '../../types/editor'
import { ChevronDown } from 'react-feather'

interface Props extends EditorProps<string> {
  units: readonly string[]
}
export const UnitSelect = ({ units, value, onChange }: Props) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          appearance: 'none',
          border: 'none',
          background: 'none',
          color: 'text',
        }}
      >
        <Select.Value>
          {!['number', 'keyword'].includes(value) && value}
        </Select.Value>
        <Select.Icon>
          <ChevronDown size={14} sx={{ transform: 'translateY(3px)' }} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content
        sx={{
          backgroundColor: 'background',
          py: 2,
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
          fontSize: 1,
          cursor: 'pointer',
        }}
      >
        <Select.Viewport>
          {units.map((unit: string) => {
            return (
              <Select.Item
                value={unit}
                sx={{
                  position: 'relative',
                  pr: 3,
                  pl: 4,
                  ':hover': {
                    backgroundColor: 'primary',
                  },
                }}
              >
                <Select.ItemIndicator
                  sx={{
                    position: 'absolute',
                    left: 3,
                  }}
                >
                  ✓
                </Select.ItemIndicator>
                <Select.ItemText>{unit}</Select.ItemText>
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
