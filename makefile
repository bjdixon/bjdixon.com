BUILDSITE:
	node index.js

PUBLISH:
	git checkout gh-pages && find -name "*" -not -path "./node_modules/*" -not -name "node_modules" -not -name ".git*" -not -path "./.git/*" -delete && git checkout master build && mv build/* ./ && rmdir build
