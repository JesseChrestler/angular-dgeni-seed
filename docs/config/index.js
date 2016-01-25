"use strict";


module.exports = function(outputFolder, sourceFiles, exampleJs, exampleCss, rootPath) {
    console.log("started configuring docs...");
    if (outputFolder === undefined) {
        outputFolder = "build";
    }
    if (sourceFiles === undefined) {
        sourceFiles = [
            {
                include: 'ng/src/**/*.js',
                exclude: 'ng/src/angular.bind.js',
                basePath: 'ng/src'
            }, 
            {
                include: 'ng/content/**/*.ngdoc',
                basePath: 'ng/content'
            }
        ]
    }
    var path = require('canonical-path');
    var packagePath = __dirname;
    var Package = require('dgeni').Package;

    // Create and export a new Dgeni package called angularjs. This package depends upon
    // the ngdoc, nunjucks, and examples packages defined in the dgeni-packages npm module.
    var dgeniPackage = new Package('angularjs', [
        require('dgeni-packages/ngdoc'),
        require('dgeni-packages/nunjucks'),
        require('dgeni-packages/examples')
    ])
    .factory(require('./services/errorNamespaceMap'))
    //default deployment
    .factory(require('./services/deployments/default')(exampleJs, exampleCss, rootPath))

    .factory(require('./inline-tag-defs/type'))

    .processor(require('./processors/error-docs'))
    .processor(require('./processors/index-page'))
    .processor(require('./processors/keywords'))
    .processor(require('./processors/pages-data'))
    //.processor(require('./processors/versions-data'))


    .config(function(dgeni, log, readFilesProcessor, writeFilesProcessor) {

        //dgeni.stopOnValidationError = true;
        //dgeni.stopOnProcessingError = true;

        log.level = 'info';

        readFilesProcessor.basePath = path.resolve(__dirname, '../..');
        readFilesProcessor.sourceFiles = sourceFiles;
        writeFilesProcessor.outputFolder = outputFolder;

    })


    .config(function(parseTagsProcessor) {
        parseTagsProcessor.tagDefinitions.push(require('./tag-defs/tutorial-step'));
        parseTagsProcessor.tagDefinitions.push(require('./tag-defs/sortOrder'));
    })


    .config(function(inlineTagProcessor, typeInlineTagDef) {
        inlineTagProcessor.inlineTagDefinitions.push(typeInlineTagDef);
    })


    .config(function(templateFinder, renderDocsProcessor) {
        templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
        //renderDocsProcessor.extraData.git = gitData;
    })


    .config(function(computePathsProcessor, computeIdsProcessor) {

        computePathsProcessor.pathTemplates.push({
            docTypes: ['error'],
            pathTemplate: 'error/${namespace}/${name}',
            outputPathTemplate: 'partials/error/${namespace}/${name}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['errorNamespace'],
            pathTemplate: 'error/${name}',
            outputPathTemplate: 'partials/error/${name}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['overview', 'tutorial'],
            getPath: function(doc) {
                var docPath = path.dirname(doc.fileInfo.relativePath);
                if (doc.fileInfo.baseName !== 'index') {
                    docPath = path.join(docPath, doc.fileInfo.baseName);
                }
                return docPath;
            },
            outputPathTemplate: 'partials/${path}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['e2e-test'],
            getPath: function() {},
            outputPathTemplate: 'ptore2e/${example.id}/${deployment.name}_test.js'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['indexPage'],
            pathTemplate: '.',
            outputPathTemplate: '${id}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['module'],
            pathTemplate: '${area}/${name}',
            outputPathTemplate: 'partials/${area}/${name}.html'
        });
        computePathsProcessor.pathTemplates.push({
            docTypes: ['componentGroup', 'event'],
            pathTemplate: '${area}/${moduleName}/${groupType}',
            outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
        });

        computeIdsProcessor.idTemplates.push({
            docTypes: ['overview', 'tutorial', 'e2e-test', 'indexPage'],
            getId: function(doc) {
                return doc.fileInfo.baseName;
            },
            getAliases: function(doc) {
                return [doc.id];
            }
        });

        computeIdsProcessor.idTemplates.push({
            docTypes: ['error'],
            getId: function(doc) {
                return 'error:' + doc.namespace + ':' + doc.name;
            },
            getAliases: function(doc) {
                return [doc.name, doc.namespace + ':' + doc.name, doc.id];
            }
        }, {
            docTypes: ['errorNamespace'],
            getId: function(doc) {
                return 'error:' + doc.name;
            },
            getAliases: function(doc) {
                return [doc.id];
            }
        });
    })

    .config(function(checkAnchorLinksProcessor) {
        checkAnchorLinksProcessor.base = '/';
        // We are only interested in docs that have an area (i.e. they are pages)
        checkAnchorLinksProcessor.checkDoc = function(doc) {
            return doc.area;
        };
    })


    .config(function(generateIndexPagesProcessor, generateProtractorTestsProcessor, generateExamplesProcessor, defaultDeployment) {

        generateIndexPagesProcessor.deployments = [
            defaultDeployment
        ];

        generateProtractorTestsProcessor.deployments = [
            defaultDeployment
        ];

        generateProtractorTestsProcessor.basePath = outputFolder;

        generateExamplesProcessor.deployments = [
            defaultDeployment
        ];
    });
    console.log("finished configuring docs...");
    return dgeniPackage;
}
