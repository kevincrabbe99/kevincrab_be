import React from 'react'
import PropTypes from 'prop-types'
import './Start_menu.css'

import ICO_programs from '../../../img/Program_Folder.ico'
import ICO_Documents from '../../../img/my_documents.ico'
import ICO_Settings from '../../../img/Settings.ico'
import ICO_find from '../../../img/find.ico'
import ICO_help from '../../../img/Help_book.ico'
import ICO_run from '../../../img/run.ico'
import ICO_shutdown from '../../../img/shut_down_computer.ico'

const Start_menu = props => {
    return (
        <div className = "startMenu_main">
            <div className = "left_side">
                <div className = "left_label">
                    <h2>
                       <b>Kevin</b> 2000
                    </h2>
                </div>
            </div>
            <div className = "right_side">
                <table>
                    <tbody>
                        <tr>
                            <td className = "icn_programs">
                                <img src = {ICO_programs} ></img>
                            </td>
                            <td>
                                Programs
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_documents">
                                <img src = {ICO_Documents} ></img>
                            </td>
                            <td>
                                Documents
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_settings">
                                <img src = {ICO_Settings} ></img>
                            </td>
                            <td>
                                Settings
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_find">
                                <img src = {ICO_find} ></img>
                            </td>
                            <td>
                                Find
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_help">
                                <img src = {ICO_help} ></img>
                            </td>
                            <td>
                                Help
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_run">
                                <img src = {ICO_run} ></img>
                            </td>
                            <td>
                                Run
                            </td>
                        </tr>
                        <tr>
                            <td className = "icn_shutdown">
                                <img src = {ICO_shutdown} ></img>
                            </td>
                            <td>
                                Shut Down...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Start_menu.propTypes = {

}

export default Start_menu
