import React from 'react'
import "./folderIconList.scss"
import { FileNode } from '../../../../../types/FileNode';

export default function FolderIconList(props: any) {

    const content: FileNode[] = props.content;

    return (
        <div className="folderIconList-wrapper">
            <ul>
                {
                    content.map((item: FileNode, index: number) => {
                        return (
                            <li key={`${item.name}-${index}`}>
                                <div className="folderIconList-item">
                                    <div className="folderIconList-item-icon">
                                        <img src={`./icons/${item.icon}`} alt={item.name || ''} />
                                    </div>
                                    <div className="folderIconList-item-label">
                                        {item.name}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
