type TypesElement = '' | 'password' | 'folder'
export type DataHeaderMainItemProps = {
    icon: React.ComponentType<{className?: string}>
    typeElement: TypesElement
    text: string

}
export type DataHeaderMainProps = {
    userId: string
}
