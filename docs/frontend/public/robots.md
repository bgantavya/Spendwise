# Robots.txt

## Description

This `robots.txt` file provides instructions to web robots (crawlers) about which parts of the website should not be processed or scanned. It follows the standard robots.txt protocol.

## How to Use

Place this file in the root directory of your website. Web crawlers will automatically check this file to understand the crawling rules.

## Technologies Used

- robots.txt protocol

## Architecture or Code Overview

- `User-agent: *`: Applies the following rules to all user agents (web crawlers).
- `Disallow:`:  Indicates that no pages or sections are disallowed, meaning that crawlers are allowed to access all parts of the site.

## Known Issues / Improvements

- Consider adding specific `Disallow` rules to restrict access to certain directories or files if needed.

## Additional Notes or References

- [robots.txt Standard](https://www.robotstxt.org/robotstxt.html)