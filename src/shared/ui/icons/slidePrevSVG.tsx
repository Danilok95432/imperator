import { type FC } from 'react'

type SlidePrevSvgProps = {
	color?: string
}

export const SlidePrevSvg: FC<SlidePrevSvgProps> = ({ color = '#000' }) => {
	return (
		<svg width='9' height='15' viewBox='0 0 9 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.20393 0.964097C8.59869 1.35462 8.59869 1.98779 8.20393 2.37831L2.94038 7.6712L8.20393 12.9641C8.59869 13.3546 8.59869 13.9878 8.20393 14.3783C7.80917 14.7688 7.16915 14.7688 6.77439 14.3783L0.796068 8.37831C0.401311 7.98779 0.401311 7.35462 0.796068 6.9641L6.77439 0.964097C7.16915 0.573573 7.80917 0.573573 8.20393 0.964097Z'
				fill={color}
			/>
		</svg>
	)
}
