import tkinter as tk


class EntryLabel(tk.Label):
    """
    A customized label widget with adjustable relative positioning and size.

    Parameters:
        parent (tk.Tk): The parent tkinter window.
        text (str): The text to display on the label.
        relx_value (float): Relative x-coordinate of the label.
        rely_value (float): Relative y-coordinate of the label.
        relwidth_value (float): Relative width of the label.
        relheight_value (float, optional): Relative height of
            the label. Default is 0.1.
    """

    def __init__(
        self,
        parent: tk.Tk,
        text: str,
        relx_value: float,
        rely_value: float,
        relwidth_value: float,
        relheight_value: float = 0.1,
    ):
        super().__init__(parent, text=text)
        self.place(
            relx=relx_value,
            rely=rely_value,
            relwidth=relwidth_value,
            relheight=relheight_value,
        )
