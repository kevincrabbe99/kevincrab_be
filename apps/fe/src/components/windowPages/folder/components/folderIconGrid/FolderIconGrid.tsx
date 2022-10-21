import React from 'react'
import "./folderIconGird.scss"
import { FileNode, FileNodeAction } from '../../../../../types/FileNode';

export default function FolderIconGrid(props: any) {

    const content: FileNode[] = props.content;
    const handleFileNodeAction = props.handleFileNodeAction;

    const fileNodeActionEvent = (e: any, item: FileNode) => {
        handleFileNodeAction(item)
    }

    return (
        <div className="folderIconGrid-wrapper">
            {
                content && 
                content.map((item: FileNode, index: number) => {
                    return (
                        <div key={`${item.name}-${index}`} className="folderIconGrid-item" onClick={() => fileNodeActionEvent( (e:any)=> e, item) }>
                            <div className="folderIconGrid-item-icon">
                                <img src={`./icons/${item.icon}`} />
                            </div>
                            <div className="folderIconGrid-item-label">
                                {item.name}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
