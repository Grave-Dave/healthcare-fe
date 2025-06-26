import MySelect from "../MySelect/MySelect.tsx";
import theme from "../../layouts/Layout/themeMaterialUi.ts";

interface MobileHourRangeSelectProps {
    startHour?: number
    endHour?: number
    onStartHourChange: (value: number, option: 'from' | 'to') => void
    onEndHourChange: (value: number, option: 'from' | 'to') => void
}

export const HOURS: { value: number, name: string }[] = Array.from({length: 24}, (_, i) => ({
    value: i,
    name: `${i}:00`
}))

const MobileHourRangeSelect = ({
                                   startHour,
                                   endHour,
                                   onStartHourChange,
                                   onEndHourChange,
                               }: MobileHourRangeSelectProps) => {
    return (
        <div style={{display: 'flex', gap: 16, padding: theme.spacing(3, 0)}}>
            <MySelect
                onChange={(e) => onStartHourChange(+e.target.value, 'from')}
                value={startHour}
                label="Od"
                menuItems={HOURS}
            />
            <MySelect
                onChange={(e) => onEndHourChange(+e.target.value, 'to')}
                value={endHour}
                label="Do"
                menuItems={HOURS}
            />
        </div>
    )
}

export default MobileHourRangeSelect
