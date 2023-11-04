import { formatDate } from "../util";
import { Tooltip, Avatar } from 'antd';
// antd compatible
import { Comment } from '@ant-design/compatible';
import { useUser } from "@clerk/nextjs";


const EndorsementRow = ({ endorsement, defaultName, preview = false }) => {
    const { user} = useUser()


    const { name, createdAt, message, authorHandle, authorName, authorImage } = endorsement;

    const formattedDate = formatDate(createdAt);
    const authorImageSrc = authorImage ?? '/profile.png';
    const authorImageAlt = `${authorName}'s profile image`;
    const authorHeading = authorHandle ? <a style={{color: 'blue'}} href={`/profile/${authorHandle}`}>{authorName}</a> : <span>{authorName}</span>;
    const endorseText = <span>{authorHeading} endorsed {name ?? defaultName}</span>;

    // TODO:
    const isOwner = true || user?.unsafeMetadata.handle === authorHandle;

    const actions = []

    const approve = () => alert('TODO: approve')
    const remove = () => alert('TODO: remove')

    if (isOwner) {
        actions.push(<span key="comment-basic-approve" onClick={approve}>Approve</span>)
        actions.push(<span key="comment-basic-delete" onClick={remove}>Delete</span>)
    }

    return (
        <span className="endorsement-row">
            {preview && <span>
                Preview</span>
            }

            <Comment
            actions={actions}
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