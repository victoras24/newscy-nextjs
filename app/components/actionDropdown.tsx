import { Button } from "./button"
import { DropdownMenu, DropdownMenuTrigger } from "./dropdown-menu"

export const ActionDropdown: React.FC = () => {
    return (
        <DropdownMenu modal={false}>
        <DropdownMenuTrigger >
        <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        </DropdownMenu>
    )
}