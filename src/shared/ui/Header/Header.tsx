import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { LogoSVG } from '../icons/logoSVG'
// import { PersonIconSvg } from '../icons/personIconSVG'
import { FileLinkSVG } from '../icons/fileLinkSVG'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { LogoMobileSVG } from '../icons/logoMobileSVG'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Header = () => {
	const breakpoint = useBreakPoint()
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1340)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<header className={styles.header}>
			<Container>
				<FlexRow className={styles.headerRow}>
					<Link to={'https://атманки.рф'} aria-label='Главная' title='Главная'>
						{breakpoint === 'S' ? <LogoMobileSVG /> : <LogoSVG />}
					</Link>
					<div className={styles.infoBlock}>
						<p className={styles.dates}>22-24 августа 2025 года</p>
						<p>{'Игры завершились'}</p>
					</div>
					{isSmallScreen ? (
						<FlexRow className={styles.controlsSmallRow}>
							{/*
              <FlexRow className={styles.modalsRow}>
                <p className={styles.starts}>
									Регистрация участников игр <br /> начнётся с 1 августа
								</p>
                <MainButton
                  className={styles.headerBtn}
                  onClick={() => openModal(<RegEventGuestModal id={'1'} />)}
                >
                  Регистрация гостей
                </MainButton>
								<MainButton
									className={styles.headerBtn}
									onClick={() => openModal(<RegEventPartModal id={'1'} />)}
								>
									Регистрация участников
								</MainButton>
                <Link to={'https://lk.этноспорт.рф'} className={styles.enterLK}>
                  <div className={styles.vector}>
                    <PersonIconSvg />
                  </div>
                  <p>Войти в кабинет</p>
                </Link>
              </FlexRow>
              */}
							<FlexRow className={styles.linksRow}>
								<a href={`https://этноспорт.рф/events/1/docs`} className={styles.linkEl}>
									<FileLinkSVG />
									<span>Политика защиты и обработки персональных данных</span>
								</a>
								<a href={`https://этноспорт.рф/events/1/rules`} className={styles.linkEl}>
									<FileLinkSVG />
									<span>Правила посещения игр</span>
								</a>
							</FlexRow>
						</FlexRow>
					) : (
						<FlexRow className={styles.controlsRow}>
							{/*
							<FlexRow>
								<p className={styles.starts}>
									Регистрация участников игр <br /> начнётся с 1 августа
								</p>
								<MainButton
									className={styles.headerBtn}
									onClick={() => openModal(<RegEventGuestModal id={'1'} />)}
								>
									Регистрация гостей
								</MainButton>
								<MainButton
									className={styles.headerBtn}
									onClick={() => openModal(<RegEventPartModal id={'1'} />)}
								>
									Регистрация участников
								</MainButton>
							</FlexRow>
							<Link to={'https://lk.этноспорт.рф'} className={styles.enterLK}>
								<div className={styles.vector}>
									<PersonIconSvg />
								</div>
								<p>Войти в кабинет</p>
							</Link>
							*/}
							<FlexRow className={styles.linksRow}>
								<a href={`https://этноспорт.рф/events/1/docs`} className={styles.linkEl}>
									<FileLinkSVG />
									<span>Политика защиты и обработки персональных данных</span>
								</a>
								<a href={`https://этноспорт.рф/events/1/rules`} className={styles.linkEl}>
									<FileLinkSVG />
									<span>Правила посещения игр</span>
								</a>
							</FlexRow>
						</FlexRow>
					)}
				</FlexRow>
			</Container>
		</header>
	)
}
