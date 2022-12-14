import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activatedViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
        ? <input
            onBlur={activatedViewMode}
            value={title}
            autoFocus
            onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activatedEditMode}>{props.title}</span>
}