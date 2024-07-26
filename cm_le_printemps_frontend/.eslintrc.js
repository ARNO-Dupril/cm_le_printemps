// eslint-disable-next-line no-undef
module.exports = {
    root:true,
    overrides: [
        {
            files: [
                '*.html',
                '*.blade.php'
            ],
            parser: '@angular-eslint/template-parser',
        },
    ],
}