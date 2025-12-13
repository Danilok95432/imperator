import { type FC } from 'react'
type SlideNextSvgProps = {
	color?: string
	className?: string
}

export const SlideNextSvg: FC<SlideNextSvgProps> = ({ color = '#000', className }) => {
	return (
		<svg
			width='9'
			height='15'
			viewBox='0 0 9 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0.796068 14.3783C0.401311 13.9878 0.401311 13.3546 0.796068 12.9641L6.05962 7.6712L0.796068 2.37831C0.401311 1.98779 0.401311 1.35462 0.796068 0.964096C1.19083 0.573572 1.83085 0.573572 2.22561 0.964096L8.20393 6.9641C8.59869 7.35462 8.59869 7.98779 8.20393 8.37831L2.22561 14.3783C1.83085 14.7688 1.19083 14.7688 0.796068 14.3783Z'
				fill={color}
			/>
		</svg>
	)
}
