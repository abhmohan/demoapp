import Typography from "@mui/material/Typography";
import styles from './Profile.module.css';

type DetailType = {
    label: string,
    value: string | number,
    index: number
};

const Detail = ({ label, value }: DetailType) => {
    return (
        <div className={styles.container}>
            <Typography className={styles.label} variant='subtitle2'>{label}:</Typography>
            <Typography className={styles.value} variant='subtitle1'>{value}</Typography>
        </div>
    )
};

export default Detail;