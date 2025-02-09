import { render } from "@jsonresume/jsonresume-theme-professional";
async function renderJson() {
	const componentsOrder = [
		"Hero",
		"Summary",
		"Work",
		"Projects",
		"Volunteer",
		"Education",
		"Certificates",
		"Education",
		"Publications",
		"Awards",
		"Languages",
		"Skills",
		"Interests",
		"References",
	];
	const jsonText = await Bun.file("./resume.json").text();
	const resumeJson = await JSON.parse(jsonText);
	return render(resumeJson, componentsOrder);
}

async function writeToHtml() {
	const html = await renderJson();
	await Bun.write("./public/index.html", html);
}

writeToHtml();
