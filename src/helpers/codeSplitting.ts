import { ComponentType } from 'react';

interface LoadedObject {
  name: string;
  status: boolean;
}

export const lazyRetry = function (
  componentImport: () => Promise<any>,
  componentName: string
) {
  const handlePromise: Promise<{
    default: ComponentType<any>;
  }> = new Promise((resolve, reject) => {
    const loaded: LoadedObject[] = JSON.parse(
      window.sessionStorage.getItem(`_r`) || '[]'
    );
    const hasRefreshed = loaded.find(
      (item) => item.name === componentName
    )?.status;
    componentImport()
      .then((component) => {
        const index = loaded.findIndex((item) => item.name === componentName);
        if (index >= 0) {
          loaded[index] = { name: componentName, status: false };
        } else {
          loaded.push({ name: componentName, status: false });
        }

        window.sessionStorage.setItem(`_r`, JSON.stringify(loaded));
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          const index = loaded.findIndex((item) => item.name === componentName);
          if (index >= 0) {
            loaded[index] = { name: componentName, status: true };
          } else {
            loaded.push({ name: componentName, status: true });
          }
          window.sessionStorage.setItem(`_r`, JSON.stringify(loaded));
          window.location.reload();
        }
        reject(error);
      });
  });

  return handlePromise;
};
