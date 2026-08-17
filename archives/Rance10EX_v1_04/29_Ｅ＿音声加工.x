tree Ｅ＿音声加工 = {
	WorkSpace = {
		０ = {
			種類 = "ローパスフィルタ",
			freq = 4000,
			qFactor = 1.000000,
		},
	},
	リバーブテスト = {
		０ = {
			種類 = "リバーブ",
			reverbSignalRatio = 0.400000,
			preDelay = 70,
			reverb = {
				０ = {
					種類 = "ゲイン",
					ratio = 0.501187,
				},
				１ = {
					種類 = "マルチコムフィルタ",
					tapL = (list) { 27, 37, 41, 50 },
					tapR = (list) { 23, 37, 41, 53 },
					inputRatio = 0.600000,
					feedbackRatio = 0.890000,
				},
				２ = {
					種類 = "オールパスフィルタ",
					delayTime = 11,
					a = 0.400000,
				},
				３ = {
					種類 = "オールパスフィルタ",
					delayTime = 17,
					a = 0.700000,
				},
				４ = {
					種類 = "ローパスフィルタ",
					freq = 6000,
					qFactor = 0.500000,
				},
			},
			earlyReflection = {
				０ = {
					種類 = "マルチタップディレイ",
					tapL = (list) { 50, 67, 74, 81 },
					tapR = (list) { 51, 67, 73, 83 },
					inputRatio = 0.500000,
					delaySignalRatio = 0.700000,
				},
				１ = {
					種類 = "ゲイン",
					ratio = 0.063096,
				},
				２ = {
					種類 = "ローパスフィルタ",
					freq = 4000,
					qFactor = 0.500000,
				},
			},
		},
		１ = {
			種類 = "リミット",
			ratio = 1.000000,
			returnTime = 10,
		},
	},
	電話 = {
		０ = {
			種類 = "ローパスフィルタ",
			freq = 4000,
			qFactor = 1.000000,
		},
	},
};