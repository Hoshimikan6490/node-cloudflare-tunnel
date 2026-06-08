const os = require('os');

const cloudFlaredReleaseUrl =
	'https://github.com/cloudflare/cloudflared/releases';
const cloudFlaredReleaseAPIUrl =
	'https://api.github.com/repos/cloudflare/cloudflared/releases';

// Cloudflare Tunnelのクライアントをプラットフォームごとに識別してダウンロード
async function main() {
	// OSのプラットフォームを識別
	const platform = os.platform();
	const arch = os.arch();
	// 最新バージョンの取得
	const latestVersion = await getLatestCloudFlaredVersion();
	console.log('Latest version:', latestVersion);

	const assetName = getCloudFlaredAssetName(platform, arch);
	const downloadUrl = `${cloudFlaredReleaseUrl}/download/${latestVersion}/${assetName}`;

	console.log('Download URL:', downloadUrl);
	return downloadUrl;
}

main();

function getCloudFlaredAssetName(platform, arch) {
	switch (platform) {
		case 'win32':
			if (arch === 'ia32') {
				return 'cloudflared-windows-386.exe';
			}

			if (arch === 'x64' || arch === 'arm64') {
				return 'cloudflared-windows-amd64.exe';
			}

			throw new Error(`Unsupported Windows architecture: ${arch}`);
		case 'darwin':
			if (arch === 'arm64') {
				return 'cloudflared-darwin-arm64.tgz';
			}

			if (arch === 'x64') {
				return 'cloudflared-darwin-amd64.tgz';
			}

			throw new Error(`Unsupported macOS architecture: ${arch}`);
		case 'linux':
			if (arch === 'x64') {
				return 'cloudflared-linux-amd64';
			}

			if (arch === 'ia32') {
				return 'cloudflared-linux-386';
			}

			if (arch === 'arm64') {
				return 'cloudflared-linux-arm64';
			}

			if (arch === 'arm') {
				return getLinuxArmAssetName();
			}

			throw new Error(`Unsupported Linux architecture: ${arch}`);
		default:
			throw new Error(`Unsupported platform: ${platform}`);
	}
}

function getLinuxArmAssetName() {
	const armVersion = Number(process.config?.variables?.arm_version || 0);

	if (armVersion >= 7) {
		return 'cloudflared-linux-armhf';
	}

	return 'cloudflared-linux-arm';
}

async function getLatestCloudFlaredVersion() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${cloudFlaredReleaseAPIUrl}/latest`);

			const result = await response.json();
			resolve(result.tag_name);
		} catch (error) {
			reject(error);
		}
	});
}
