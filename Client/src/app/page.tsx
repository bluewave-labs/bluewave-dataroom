import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	return (
		<>
			<div>Home page</div>;
			<Link href="/profile" passHref>
				<button type="button" className={styles['gradient-button']}>
					Go to Profile
				</button>
			</Link>
		</>
	);
}
