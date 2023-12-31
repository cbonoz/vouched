import { formatDate } from "../util";
import { Tooltip, Avatar } from 'antd';
// antd compatible
import { Comment } from '@ant-design/compatible';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useUser } from "@clerk/nextjs";


const EndorsementRow = ({ endorsement, defaultName, preview = false }) => {
    const { user} = useUser()


    const { name, createdAt, company, duration, message, authorHandle, authorName, authorImage } = endorsement;

    const formattedDate = formatDate(createdAt);
    const authorImageSrc = authorImage ?? '/profile.png';
    const authorImageAlt = `${authorName}'s profile image`;
    const authorHeading = authorHandle ? <a style={{color: 'blue'}} href={`/profile/${authorHandle}`}>{authorName}</a> : <span>{authorName}</span>;
    const endorseText = <span>{authorHeading} endorsed {name ?? defaultName}</span>;
    const workText = <span>{authorName} worked with {name ?? defaultName} at {company} for {duration} years.</span>

    // TODO:
    const isOwner = true || user?.unsafeMetadata.handle === authorHandle;

    const actions = []

    const approve = () => alert('TODO: approve')
    const remove = () => alert('TODO: remove')

    if (isOwner && !preview) {
        actions.push(<span key="comment-basic-approve" onClick={approve}>Make Public</span>)
        actions.push(<span key="comment-basic-delete" onClick={remove}>Delete</span>)
    }

    return (
        <span className={`endorsement-row ${preview ? 'preview' : ''}`}>
            {preview && <span>Endorsement Preview&nbsp;

                <Tooltip className="pointer" title={'This is how your endorsement will appear on their profile page once approved'}>
                    <InfoCircleOutlined />
                </Tooltip>
                
                </span>}

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
                    <span>
                    <p>{message}</p>
                    {company && <p className="work-text">{workText}</p>}
                    </span>
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