<h1 align="center"><a href="https://bluewavelabs.ca" target="_blank">BlueWave DataRoom</a></h1>

<p align="center"><strong>An open source DocSend alternative</strong></p>

BlueWave DataRoom is an open source DocSend alternative where you can share your files privately with anyone outside of your organization. 

Currently, BlueWave DataRoom is in its early stage of development. The current designs and the style guide can be viewed [here](https://www.figma.com/design/GLFfhwOQeHmbcflgCTuMKA/File-Server?node-id=0-1&t=be2sQyhaO4ylDg6z-1). Note that they are WIP.

![Github social](https://github.com/user-attachments/assets/061eaa7d-0d56-4a32-8553-bbfb7fd9e0e3)

## Database


##### Data Types

<details>
<summary><code>User</code></summary>

| **Name**       | **Type**  | **Notes**                                                   |
| -------------- | --------- | ----------------------------------------------------------- |
| `userId`       | `string`  | **Primary Key**. Unique ID for each user                    |
| `firstName`    | `string`  | First name                                                  |
| `lastName`     | `string`  | Last name                                                   |
| `email`        | `string`  | **Unique**. User's email                                    |
| `profilePicUrl`| `string`  | URL to User's picture                                       |
| `isActive`     | `boolean` | Default: `true`                                             |
| `isVerified`   | `boolean` | Default: `false`                                            |
| `lastLogin`    | `Date`    | Timestamp of the last login                                 |
| `createdAt`    | `Date`    | **Not Null**. Timestamp when the user was created           |
| `updatedAt`    | `Date`    | **Not Null**. Timestamp when the user was last updated      |

</details>

<details>
<summary><code>Documents</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `fileId`          | `string`  | **Primary Key**. Unique ID identifying the file             |
| `fileName`        | `string`  | Name of the file                                            |
| `type`            | `string`  | File type / extension                                       |
| `fileDirectory`   | `string`  | Directory where the file is located                         |
| `fileSize`        | `int`     | Size of the file in bytes                                   |
| `mimeType`        | `string`  | MIME type of the file                                       |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                 |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                              |
| `updatedBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `totalViews`      | `int`     | Total number of times the file was viewed                   |
| `uniqueViews`     | `int`     | Number of unique viewers of the file                        |

</details>

<details>
<summary><code>Links</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `linkId`          | `string`  | **Primary Key**. Unique ID for the link                     |
| `fileId`          | `string`  | **Foreign Key**. References `Documents.fileId`              |
| `linkName`        | `string`  | Name of the link                                            |
| `linkUrl`         | `string`  | URL of the link                                             |
| `isPublic`        | `boolean` | Indicates if the link is public                             |
| `emailRequired`   | `boolean` | Indicates if an email is required for download              |
| `canExpire`       | `boolean` | Indicates if the link can expire                            |
| `expirationTime`  | `Date`    | Expiration date of the link (nullable)                      |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                              |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                 |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                   |

</details>

<details>
<summary><code>DataRooms</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `folderId`        | `string`  | **Primary Key**. Unique ID for the folder                   |
| `folderName`      | `string`  | Name of the folder                                          |
| `folderLocation`  | `string`  | Location of the folder                                      |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                              |
| `updatedBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                 |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                   |

</details>

<details>
<summary><code>AccessLogs</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `logId`           | `string`  | **Primary Key**. Unique ID for each access log              |
| `linkId`          | `string`  | **Foreign Key**. ID of the link accessed                    |
| `userId`          | `string`  | **Foreign Key**. ID of the user who accessed the link       |
| `accessTime`      | `Date`    | **Not Null**. Timestamp when the link was accessed          |
| `ipAddress`       | `string`  | IP address of the user who accessed the link                |

</details>



## Features & roadmap

* Uploading and editing files
* Sharing and link control
* Tracking and analytics
* Document viewer
* Company branding

## Tech stack

* [ReactJs](https://react.dev/)
* [MUI (React framework)](https://mui.com/)
* [Node.js](https://nodejs.org/en)
* [MongoDB](https://mongodb.com)
