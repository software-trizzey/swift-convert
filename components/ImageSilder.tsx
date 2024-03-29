import React, { useState } from "react";

import {
	useSettingsContext,
	defaultSettings,
} from "@/context/SettingsProvider";

const MIN_QUALITY = 30;
const MAX_QUALITY = 100;
const STEP = 10;



function ImageSlider() {
	const { settings, updateSettings } = useSettingsContext();
	const [selectedImageQuality, setSelectedImageQuality] = useState<number>(
		settings.imageQuality || defaultSettings.imageQuality
	);

	const handleImageQualityChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const quality = parseInt(event.target.value, 10);
		setSelectedImageQuality(quality);
		updateSettings({ ...settings, imageQuality: quality });
	};

	const generateStepIntervals = () => {
		const intervals = [];
		for (let i = MIN_QUALITY; i <= MAX_QUALITY; i += STEP) {
			intervals.push(
				<li key={i} className="flex justify-center relative">
					<span
						className={`absolute ${
							selectedImageQuality === i ? "font-bold" : "text-sm"
						}`}
					>
						{i}
					</span>
				</li>
			);
		}
		return intervals;
	};

	return (
		<div className="w-48">
			<label
				htmlFor="image-quality"
				className="mb-2 text-sm font-medium text-gray-900"
			>
				Image quality
			</label>
			<input
				id="image-quality"
				type="range"
				min={MIN_QUALITY}
				max={MAX_QUALITY}
				step={STEP}
				value={selectedImageQuality}
				onChange={handleImageQualityChange}
				className="w-full h-2 accent-pink-500 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
			/>
			<ul className="flex justify-between w-full px-[10px]">
				{generateStepIntervals()}
			</ul>
		</div>
	);
};

export default ImageSlider;
