import { formatDate } from "../util";
import { Tooltip, Avatar } from 'antd';
// antd compatible
import { Comment } from '@ant-design/compatible';


const EndorsementRow = ({ endorsement, defaultName, preview = false }) => {
    const { name, createdAt, message, authorHandle, authorName, authorImage } = endorsement;

    const formattedDate = formatDate(createdAt);
    const authorImageSrc = authorImage ?? '/profile.png';
    const authorImageAlt = `${authorName}'s profile image`;
    const endorseText = `${authorName} endorsed ${name || defaultName}`

    return (
        <span className="endorsement-row">
            {preview && <span>
                Preview</span>
            }

            <Comment
                author={endorseText}
                avatar={
                    <Avatar
                        src={authorImageSrc}
                        alt={authorImageAlt}
                    />
                }
                content={
                    <p>
                        {message}
                    </p>
                }
                datetime={
                    <span>
                    at&nbsp;<Tooltip title={formattedDate}>
                        <span>{formattedDate}</span>
                    </Tooltip>
                    </span>
                }
            />
        </span>
    )
}
export default EndorsementRow;