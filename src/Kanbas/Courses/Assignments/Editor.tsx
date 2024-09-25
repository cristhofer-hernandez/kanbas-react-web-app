export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
            The assignment is available online Submit a link to the landing page of
                your Web application running on Netlify. The landing page should
                include the following: Your full name and section Link to the Kanbas
                application Links to all relevant source code repositories The
                Kanbas application should include a link to navigate back to the
                landing page.
          </textarea>
                <br />
                <table>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" value={100} />
                        </td>
                    </tr> <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td align="left" valign="top">
                            <select id="wd-group">
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                            </select>
                        </td>
                    </tr> <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td align="left" valign="top">
                            <select id="wd-display-grade-as">
                                <option value="PERCENTAGE">Percentage</option>
                                <option value="PASS/FAIL">Pass/Fail</option>
                            </select>
                        </td>
                    </tr> <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td align="left" valign="top">
                            <select id="wd-submission-type">
                                <option value="ONLINE">Online</option>
                                <option value="PAPER">Paper</option>
                            </select> <br /><br />

                            <label htmlFor="wd-online-entry-options">Online Entry Options</label><br />
                                    <label id="wd-online-entry-options">
                                        <input type="checkbox" id="wd-points" value={100} />
                                        Text Entry
                                    </label><br />
                                    <label id="wd-online-entry-options">
                                        <input type="checkbox" id="wd-points" value={100} />
                                        Website URL
                                    </label><br />
                                    <label id="wd-online-entry-options">
                                        <input type="checkbox" id="wd-points" value={100} />
                                        Media Recordings
                                    </label><br />
                                    <label id="wd-online-entry-options">
                                        <input type="checkbox" id="wd-points" value={100} />
                                        Student Annotation
                                    </label><br />
                                    <label id="wd-online-entry-options">
                                        <input type="checkbox" id="wd-points" value={100} />
                                        File Uploads
                                    </label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign">Assign</label>
                        </td>
                        <td align="left" valign="top">
                            <label htmlFor="wd-assign-to">Assign to</label><br />
                                <input id="wd-assign-to" value="Everyone" /><br /><br />

                            <label htmlFor="wd-due-date">Due</label><br />
                                <input type="date" id="wd-due-date" value="2024-05-13" /><br /><br />

                            <table>
                                <tr>
                                    <td align="left" valign="top">
                                        <label htmlFor="wd-available-from">Available from</label>
                                    </td>
                                    <td align="left" valign="top">
                                        <label htmlFor="wd-available-until">Until</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" valign="top">
                                        <input type="date" id="wd-available-from" value="2024-05-06" />
                                    </td>
                                    <td align="right" valign="top">
                                        <input type="date" id="wd-available-until" value="2024-05-20" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            <hr />
            <div >
                <button> Cancel </button>
                <button> Save </button>
            </div>
        </div>
    );}
