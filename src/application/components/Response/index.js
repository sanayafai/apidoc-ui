import React, { PropTypes } from 'react';

import { onClickHref, buildNavHref, getType } from '../../../utils';

import H2 from '../../../components/H2';
import Markdown from '../../../components/Markdown';
import JsonDoc from '../../components/JsonDoc';

import styles from './response.css';

const Response = ({ operation, service, imports, orgKey, appKey }) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      // TODO make this better, perhaps use isInImportOrService?
      const rawValue = response.type === 'string' || response.type === 'integer' || response.type === 'number' ?
                       `${response.code.integer.value}` :
                       null;
      const formattedRawValue = response.type === 'string' ? `"${rawValue}"` : rawValue;
      return (
        <div className={styles.json}>
          <JsonDoc
            modelNameClick={
              onClickHref(buildNavHref({
                organization: orgKey, application: appKey, model: getType(baseModel),
              }))
            }
            baseModel={baseModel}
            service={service}
            imports={imports}
            includeModel={true} // Removes type frrom above jsondoc
            excludeModelDescription={true} // Dont include model description above json doc
            rawValue={formattedRawValue}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.response}>
      {operation.responses.map((response, id) => (
        <div key={id} className={styles.container}>
          <H2 className={styles.name}>{`${response.code.integer.value} Response`}</H2>
          <Markdown source={response.description ? response.description : ''} className={styles.description} />
          {body(response)}
        </div>
      ))}
    </div>
  );
};

Response.propTypes = {
  operation: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

export default Response;

export {
  styles,
};