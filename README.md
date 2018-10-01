# Libman Azure DevOps pipeline extension

## what is libman?

Library Manager (LibMan) is a lightweight, client-side library acquisition tool. LibMan downloads popular libraries and frameworks from the file system or from a content delivery network (CDN). The supported CDNs include CDNJS and unpkg. The selected library files are fetched and placed in the appropriate location within the ASP.NET Core project.

## whas is this extension:

this extensions adds a build task to TFS or Azure DevOps project, that enables to restore libman packages in separate build step.

Note, that you can automatically restore libman packages as part of msbuild also by referencing :

    <PackageReference Include="Microsoft.Web.LibraryManager.Build" Version="1.0.113" />
	