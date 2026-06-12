import { EngineReadyCallbackEvent } from '@informatiq/geologiq';
import { GeologiqMenu, GeologiqProvider, GeologiqViewer, GeologiqViewerConfig, WellboreMenu } from '@informatiq/geologiq-react';
import { useMemo, useCallback } from 'react';
import { EMPTY, of } from 'rxjs';

function App() {
  // Unity build version - use the latest stable version from Informatiq CDN
  const UnityVersion = '5/1/43';

  // Configure the 3D engine with Unity WebGL build URLs
  const config = useMemo(() => {
    const c: GeologiqViewerConfig = {
      unity: {
        loaderUrl: `https://cdn.informatiq.no/unity/geologiq/${UnityVersion}/geologiq.loader.js`,
        dataUrl: `https://cdn.informatiq.no/unity/geologiq/${UnityVersion}/geologiq.data.gz`,
        frameworkUrl: `https://cdn.informatiq.no/unity/geologiq/${UnityVersion}/geologiq.framework.js.gz`,
        codeUrl: `https://cdn.informatiq.no/unity/geologiq/${UnityVersion}/geologiq.wasm.gz`,
      },
    };
    return c;
  }, []);

  // Create a data manager (required by GeologiqProvider)
  const dataManager = useMemo(
    () =>
      createDataManager({
        /* ... */
      }),
    []
  );

  // Called when the 3D engine is initialized and ready
  const onEngineReady = useCallback((event: EngineReadyCallbackEvent) => {
    console.info('Engine ready', { event });
  }, []);

  // Called when the scene is fully rendered
  const onSceneReady = useCallback(() => {
    console.info('Scene ready');
  }, []);

  return (
    <GeologiqProvider config={config} dataManager={dataManager}>
      <GeologiqMenu
              placement="top"
              menus={[
                WellboreMenu(),
              ]}
            />
      <GeologiqViewer
        onEngineReady={onEngineReady}
        onSceneReady={onSceneReady}
      />
    </GeologiqProvider>
  );
}

export default App;

function createDataManager(options: {}): any {
  return {
    // Optional collaborators
    tokenManager: undefined,
    content: undefined,
    enricher: undefined,
    contextFilter: undefined,
    principalProvider: undefined,

    // Visibility service stub
    visibility: {} as any,

    // Side-channel error stream — never emits in this mock
    errors$: EMPTY,

    // Signals data loading complete immediately
    loaded: () => of(undefined as void),

    // Store accessors — no stores registered in mock
    getStore: async () => null,
    getStores: async () => [],

    // Entity lookup — always returns not-found
    get: async () => null,

    // Fetch — returns empty result set
    fetch: () => of([]),

    // Mutations — echo back the supplied entity
    create: (_store: any, entity: any) => of(entity),
    update: (_store: any, entity: any) => of(entity),

    // Delete — returns empty deleted set
    delete: () => of([]),

    // Context position — not available in mock
    getContextPosition: () => EMPTY,

    // No-op cleanup
    dispose: () => {},
  };
}
