
export interface ToolbarConfig {
    label: string,
    submenu?: ToolbarSubmenuConfig[]
  }
  
export interface ToolbarSubmenuConfig {
    label: string,
    accelerator?: string,
    action?: ToolbarAction
    isNotAvailable?: boolean
  }
  
export type ToolbarAction  = {
    isExternal: boolean,
    destination: string
}