import React    from "react";
import {BasePanel} from "../BasePanel";

export default {
    title: "Panels/BasePanel",
    component: BasePanel,
}

export const Default = () => {
    return (
        <BasePanel titulo={"Titulo"}>
            <div>Conteudo</div>
        </BasePanel>
    )
}